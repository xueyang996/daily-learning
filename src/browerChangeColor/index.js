import React from 'react';  
const colorCluters = ['red', 'blue', 'green'];


export default class ColorPicker extends React.Component {  
    handleColorChange = color => {
        const changeColor = () => {
            window.less
                .modifyVars({  // 调用 `less.modifyVars` 方法来改变变量值
                    '@primary-color': color,
                    '@bg-color': '#2f54eb',
                })
                .then(() => {
                    console.log('修改成功');
                });
        };
        changeColor();
    };

    render() {
        return (
            <div>

                <ul className="color-picker">
                    {colorCluters.map(color => (
                        <li
                            style={{ color }}
                            onClick={() => {
                                this.handleColorChange(color);
                            }}>
                            color
                        </li>
                    ))}
                </ul>
                <div className="test-block"></div>
            </div>
        );
    }
}