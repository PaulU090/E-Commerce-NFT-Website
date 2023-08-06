import React from "react"
import '../Styles/CarouselStyles.css'
import useWindowSize from "../Hooks/useWindowSize";


export default function Carousel({carouselContents})
{
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [size] = useWindowSize();

    React.useEffect(()=>{
        setCurrentIndex(ClampCarouselIndex(currentIndex));
    }, [size])

    const GetTranslation = ()=> {
        if(size > 750)
        {
            return -125;
        }
        else if(size <= 750 && size > 640)
        {
            return -110.5;
        }
        else if(size <= 640) {
            return -125;
        }   
        
    }

    const carouselItems = carouselContents.map((current, i) => {
        return (
            <div 
                className="carousel-item"
                key = {i}
                style= {{
                    transform: `translate(${GetTranslation() * currentIndex}%)`
                }}
            >
                {current}
            </div>
        )
    })

    //Get the number of carousel items visible in the container (4 by default)
    const GetCarouselViewportCount = ()=> {
        if(size > 750)
        {
            return 4;
        }
        else if(size <= 750 && size > 640)
        {
            return 3
        }
        else if(size <= 640) {
            return 1;
        }   
    }

    const ClampCarouselIndex = (index)=> {
        let carouselWidth = GetCarouselViewportCount();
        if(index > carouselItems.length - carouselWidth)
        {
            return carouselItems.length - carouselWidth;
        }
        if(index < 0)
        {
            return 0;
        }
        return index;
    }

    const IncrementCarousel = (index)=> {
        index  =ClampCarouselIndex(index);
        setCurrentIndex(index);
    }

    return(
        <div className="carousel">
            <img 
                src= {`${process.env.PUBLIC_URL}/Images/Left-Arrow-Circled-Icon.png`} 
                className= {currentIndex === 0 ? "carousel-arrow-inactive" : "carousel-arrow"}
                onClick={() => {IncrementCarousel(currentIndex - 1)}}
            />
            <div className="carousel-viewport">
                <div className="carousel-index-viewer">
                    <div className="title-text">{`${currentIndex} / ${carouselItems.length - GetCarouselViewportCount()}`}</div>
                </div>
                {carouselItems}
            </div>
            <img 
                src= {`${process.env.PUBLIC_URL}/Images/Right-Arrow-Circled-Icon.png`} 
                className= {currentIndex === carouselItems.length - GetCarouselViewportCount() ? "carousel-arrow-inactive" : "carousel-arrow"}
                onClick={() => {IncrementCarousel(currentIndex + 1)}}
            />
            
        </div>
    )




}