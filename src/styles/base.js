import React from 'react';

export const Container = ({ children }) => {
    return <div className="container">{children}</div>
}

//================== BUTTON ================== 
export const Button = ({ className, children, size }) => {
    const btnClasses = ['btn', className]
    if (size == 'sm') {
        btnClasses.push('btn-sm')
    }
    else if (size == 'md') {
        btnClasses.push('btn-md')
    }
    else if (size == 'xl') {
        btnClasses.push('btn-xl')
    }

    return <button className={btnClasses.join(' ')}>{children}</button>

}
