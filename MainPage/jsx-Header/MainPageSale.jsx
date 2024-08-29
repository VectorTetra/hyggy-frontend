// function MainPageSale(props) {
//     return(
// 		<div id="mainPageSale">
// 			<a href="../MainPage/index.html">
//             {props.infoSales}
// 			</a>
// 		</div>
// 	)
// }

function MainPageSale(props) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    // Функция для перехода к следующему элементу
    const nextSale = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex + 1) % props.infoSales.length
        );
    };

    // Автоматическое переключение распродажи каждые 3 секунды
    React.useEffect(() => {
        const interval = setInterval(nextSale, 3000);
        return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, []);

    return (
        <div id="mainPageSale">
            <a href={props.infoSales[currentIndex].urlpage}>
                {props.infoSales[currentIndex].infoSale}
            </a>
        </div>
    );
}
