import { useState } from 'react';
import { Row, Col, Carousel } from 'react-bootstrap';
import banner4 from '@/assets/images/slider/02.jpg';
import banner3 from '@/assets/images/slider/03.jpg';
import banner1 from '@/assets/images/slider/slider-banner1.jpg';
import banner2 from '@/assets/images/slider/slider-banner2.jpg';

const SlidesWithIndicators = () => {
	const [index, setIndex] = useState<number>(0);

	const handleSelect = (selectedIndex: number) => {
		setIndex(selectedIndex);
	};

	return (

				<Carousel activeIndex={index} onSelect={handleSelect}>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={banner1}
							alt="First slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={banner2}
							alt="Second slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={banner3}
							alt="Third slide"
						/>
					</Carousel.Item>
                    <Carousel.Item>
						<img
							className="d-block w-100"
							src={banner4}
							alt="Third slide"
						/>
					</Carousel.Item>
				</Carousel>

	);
};


const Slides = () => {
	return (
		<>

			<Row>
				<Col lg={12}>
					<SlidesWithIndicators />
				</Col>
			</Row>
		</>
	);
};

export default Slides;
