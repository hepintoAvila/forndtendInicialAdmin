import Slides from './Slides';
type LandingPageProps = {
	onChangeUrl: (value: string) => void;
};
const Hero = ({onChangeUrl}:LandingPageProps) => {
	return (
		<section className="hero-section">
			 
			<Slides/>
			 
		</section>
	);
};

export default Hero;
