import { Box, Button, TextField, Typography, CircularProgress, Autocomplete } from '@mui/material';
import { useState, useEffect } from 'react';
import { useCreateBlog, useUpdateBlog, getBlogs, getJsonConstructorFile, postJsonConstructorFile, putJsonConstructorFile } from '@/pages/api/BlogApi';
import { BlogCategory2, getBlogCategories2, useBlogCategories2 } from '@/pages/api/BlogCategory2Api';
import PhotoUploader from './PhotoUploader';
import useAdminPanelStore from '@/store/adminPanel';
import useBlogInvoiceStore from '@/store/BlogInvoiceStore';
import FrameBlogInvoiceForm from './FrameBlogInvoiceForm';
import { getPhotoByUrlAndDelete, uploadPhotos } from '@/pages/api/ImageApi';
import { toast } from 'react-toastify';
import { useQueryState } from 'nuqs';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00AAAD',
            contrastText: 'white',
        },
    },
});


export default function FrameBlogAddEdit() {
    const { data: categories = [] } = useBlogCategories2({
        SearchParameter: "Query",
        PageNumber: 1,
        PageSize: 1000,
        Sorting: "BlogCategory2NameAsc"
    });
    const { rows, addTextRow, addImageRow, removeRow, updateRowContent, clearRows, setRows,
        keywords, addKeyword, removeKeyword, updateKeyword, clearKeywords, setKeywords } = useBlogInvoiceStore();
    const { mutateAsync: createBlog } = useCreateBlog();
    const { mutateAsync: updateBlog } = useUpdateBlog();
    const blogId = useAdminPanelStore((state) => state.blogId);
    const [activeTab, setActiveTab] = useQueryState("at", { defaultValue: "products", scroll: false, history: "push", shallow: true });
    const [blogCategory2, setBlogCategory2] = useState<BlogCategory2 | null>(null);
    const [blogTitle, setBlogTitle] = useState('');
    const [previewImageArray, setPreviewImageArray] = useState<string[]>([]);
    const [filePath, setFilePath] = useState<string | null>(null);
    const [photos, setPhotos] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        clearKeywords();
        clearRows();
    }, []);

    useEffect(() => {
        if (blogId === null) {
            setActiveTab("blog");
        }
        const fetchBlogData = async (id: number) => {
            setLoading(true);
            try {
                const blogs = await getBlogs({ SearchParameter: 'Query', Id: id });
                if (blogs && blogs.length > 0) {
                    const blog = blogs[0];
                    setBlogCategory2(categories.find((cat) => cat.id === blog.blogCategory2Id) || null);
                    setBlogTitle(blog.blogTitle);
                    setPreviewImageArray([blog.previewImagePath]);
                    setFilePath(blog.filePath);
                    setKeywords(blog.keywords.split('|'));
                    if (blog.filePath && blog.filePath.length > 0) {
                        const response = await getJsonConstructorFile(blog.filePath);
                        setRows(response);
                    }
                    else {
                        clearKeywords();
                        clearRows();
                    }
                }

            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (blogId && blogId !== 0) {
            fetchBlogData(blogId);
        }
        if (blogId && blogId === 0) {
            clearKeywords();
            clearRows();
        }
        console.log('blogId:', blogId);
    }, [blogId, categories]);

    const handleSave = async () => {
        // Фільтруємо пусті рядки перед оновленням стану
        const filteredRows = rows.filter((row) => {
            if (row.contentType !== "mixed") {
                // Для типів, які не є "mixed", перевіряємо, що content - рядок або масив, і має length > 0
                return (typeof row.content === "string" || Array.isArray(row.content)) && row.content.length > 0;
            } else if (row.contentType === 'mixed' && typeof row.content === 'object' && !Array.isArray(row.content)) {
                // Для "mixed" перевіряємо властивості text та photos
                return (
                    typeof row.content === "object" &&
                    (
                        (typeof row.content.text === "string" && row.content.text.length > 0) ||
                        (Array.isArray(row.content.photos) && row.content.photos.length > 0)
                    )
                );
            }
            return false; // Для всіх інших випадків (на всякий випадок)
        });

        setRows(filteredRows); // Оновлюємо стан з відфільтрованими рядками
        const filteredKeywords = keywords.filter((keyword) => keyword.length > 0);
        setKeywords(filteredKeywords); // Оновлюємо стан з відфільтрованими ключовими словами
        if (!blogTitle) {
            toast.error('Заповніть заголовок блогу! ');
            return;
        }
        if (!blogCategory2) {
            toast.error('Виберіть категорію блогу! ');
            return;
        }
        if (previewImageArray.length === 0) {
            toast.error('Додайте обкладинку блогу! ');
            return;
        }
        if (filteredRows.length === 0) {
            toast.error('Додайте контент блогу! ');
            return;
        }
        setLoading(true);
        try {
            if (blogId === 0) {
                const blogStructurePath = await postJsonConstructorFile(rows);
                await createBlog({
                    BlogCategory2Id: blogCategory2.id,
                    BlogTitle: blogTitle,
                    PreviewImagePath: previewImageArray.length > 0 ? previewImageArray[0] : '',
                    Keywords: filteredKeywords.map((keyword) => keyword).join('|'),
                    FilePath: blogStructurePath, // можна додати підтримку файлів
                });
            } else {
                const blogStructurePath = await putJsonConstructorFile(rows, filePath!);
                await updateBlog({
                    Id: blogId!,
                    BlogCategory2Id: blogCategory2.id,
                    BlogTitle: blogTitle,
                    PreviewImagePath: previewImageArray.length > 0 ? previewImageArray[0] : '',
                    Keywords: filteredKeywords.map((keyword) => keyword).join('|'),
                    FilePath: blogStructurePath!,
                });
            }
            clearRows();
            clearKeywords();
            setActiveTab("blog");
        } catch (error) {
            console.error('Error saving blog:', error);
        } finally {
            setLoading(false);
        }
    };

    // const handleSelectPreviewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const image = URL.createObjectURL(event.target.files[0]);
    //         setPreviewImageArray(image);
    //     }
    // };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <Typography variant="h5" color="textPrimary">
                    {blogId === 0 ? 'Додати блог' : 'Редагування блогу'}
                </Typography>

                <Autocomplete
                    options={categories}
                    getOptionLabel={(option: BlogCategory2) => `${option.name} (${option.blogCategory1Name})`}
                    value={blogCategory2 || null}
                    onChange={(event, newValue) => setBlogCategory2(newValue)}
                    renderInput={(params) => <TextField {...params} label="Виберіть категорію" variant="outlined" />}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                />

                <TextField
                    label="Заголовок блогу"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    fullWidth
                    variant="outlined"
                />
                <h4>Обкладинка блогу</h4>
                <PhotoUploader photos={previewImageArray}
                    setPhotos={setPreviewImageArray}
                    UploadPhoto={async (ev) => {
                        const files = ev.target.files;
                        if (files) {
                            const data = await uploadPhotos(files);
                            setPreviewImageArray(data);
                        }
                    }}
                    removePhoto={async (filename) => {
                        try {
                            await getPhotoByUrlAndDelete(filename);
                            setPreviewImageArray([]);
                        }
                        catch (error) {
                            console.error('Error deleting photo:', error);
                        }
                        finally {
                            setPreviewImageArray([]);
                        }
                    }}
                    setIsPhotosDirty={null}
                    maxPhotos={1}
                />
                <FrameBlogInvoiceForm></FrameBlogInvoiceForm>
                {/* <PhotoUploader
                photos={photos}
                setPhotos={setPhotos}
                onSelectPreviewImage={handleSelectPreviewImage}
                previewImage={previewImage}
            /> */}

                {loading ? (
                    <CircularProgress size={24} />
                ) : (
                    <Button variant="contained" sx={{ backgroundColor: "#00AAAD" }} onClick={handleSave}>
                        Зберегти
                    </Button>
                )}
            </Box>
        </ThemeProvider>
    );
}
