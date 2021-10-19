import React, { useRef, useState } from 'react'
import cn from 'classnames'
import './index.less'

export interface IShapeProps {
    children?: React.ReactNode
};

const Shape: React.FC<
    IShapeProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
    const { children, style } = props
    const [show, setShow] = useState(false)
    const shapeRef = useRef<HTMLDivElement>(null)

    const handleShapeMove = (e: React.MouseEvent) => {
        e.preventDefault()

        const el = shapeRef.current
        if (!el || !show) return
        const { clientX: x, clientY: y } = e
        const { top, left } = el.getBoundingClientRect()
        const move = (ev: MouseEvent) => {
            const { clientX: mvX, clientY: mvY } = ev
            // 324代表左边框的宽度
            const posLeft = left + mvX - x - 324
            // 64代表上边宽的宽度
            const posTop = top + mvY - y - 64
            el.style.left = `${posLeft}px`
            el.style.top = `${posTop}px`
        }

        const up = () => {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', up)
        }

        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
    }

    const handleShowLine = () => {
        setShow(!show)
    }

    const renderPoints = () => {
        const renderList = ['left-top', 'right-top', 'left-bottom', 'right-bottom', 'line-top', 'line-left', 'line-right', 'line-bottom']
        return renderList.map(item => {
            if (item.includes('line')) {
                return <div key={item} className={cn('line', item)}></div>
            }
            return <div key={item} className={cn('point', `point-${item}`)}></div>
        })
    }

    return (
        <div
            ref={shapeRef}
            className={cn('Shape', { show })}
            style={style}
            onDoubleClick={handleShowLine}
            onMouseDown={handleShapeMove}
        >
            {show && renderPoints()}
            {children}
        </div>
    );
}

export default Shape;