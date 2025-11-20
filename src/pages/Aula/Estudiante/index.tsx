import LoginEstudiante from '@/pages/account/LoginEstudiante';

const Estudiante = () => {
    
    const InicioLogin = () => {

        return (
            <section className="py-0 px-0 border-top border-bottom border-light" id="contact-us-landing">
             <div style={{marginTop:'11rem'}}>    
                         <LoginEstudiante />
				</div> 
            </section>
        );
    };    

 
    return <><InicioLogin /></>;
    
};

export default Estudiante;
