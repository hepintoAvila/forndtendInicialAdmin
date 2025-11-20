import React from 'react';
import classNames from 'classnames';

type CardTitleProps = {
    title: string | React.ReactNode;
    containerClass: string;
    icon?: string;
    inbox?: string;
    titleColor?: string;
    menuItems?:  {}|[];
};

const CardTitle = ({ title, containerClass, icon,inbox,titleColor }: CardTitleProps) => {
    return (
        <>  <div className={`cart-img-box ${inbox}`}>
            <i className={classNames(`${icon} ${containerClass}`)}></i> 
			</div> 
            <h4 className={`header-title ${titleColor}`}>{title}</h4>
        </>
    );
};

export default CardTitle;
