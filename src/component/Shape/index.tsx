import React from 'react'
import cn from 'classnames'
import './index.less'

export interface IShapeProps {
    children?: React.ReactNode
};

const Shape: React.FC<
    IShapeProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
    const { children, style } = props

    const renderPoints = () => {
        const positionList = ['left-top', 'right-top', 'left-bottom', 'right-bottom']
        return positionList.map(position => <div key={position} className={cn('point', `point-${position}`)}></div>)
    }

    console.log(children)
    return (
        <div className='Shape' style={style}>
            {renderPoints()}
            {children}
        </div>
    );
}

export default Shape;