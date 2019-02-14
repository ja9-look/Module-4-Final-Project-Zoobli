import React from 'react';

const ImageForm = (props) => {

    return(
        <div className={'collapsible_forms hidden'}>
            <form className={'ImageForm'} onSubmit={props.handleImageForm}>
                <input type="text" name="image_url" placeholder="Enter Image URL"/>
                <input className='pseudobutton' id="button" type="submit" value='Add Image'/>
            </form>
            <div className={'search_form_wrapper'}>
                <form>
                    <input type="search" placeholder="Search tags" />
                    <input id="button" type="submit" value="Search" />
                </form>
            </div>
        </div>
    )

}

export default ImageForm;