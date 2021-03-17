import { useMutation, gql } from "@apollo/client";
import { Box, Button } from "@material-ui/core";
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import PageContext from "../contexts/PageContext";
import RowContext from "../contexts/RowContext";
import Loading from './Loading';

const CREATE_IMAGE_COMPONENT = gql`
mutation CreateImageComponent($image: Upload, $rowIndex: Int!, $pageId: String!) {
    createImageComponent(image: $image, rowIndex: $rowIndex, pageId: $pageId){
        id
        title
        contentRows{
            contentComponents{
                type
                content
            }
        }
    }
}
`;

const CreateImageContent = (props) => {

    const [image, setImage] = useState(null);
    const pageId = useContext(PageContext);
    const rowIndex = useContext(RowContext); 

    const [update, {data, error, loading}] = useMutation(CREATE_IMAGE_COMPONENT);

    const handleChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSave = () => {
        update({variables:{
            image: image,
            rowIndex: rowIndex,
            pageId: pageId
        }});
    }

    useEffect(() => {
        if (!loading && data){
            props.handleChangeStatus();
        }
    }, [data, loading]);

    if (loading) return (<Loading/>);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">

            <input type="file" placeholder="Choose a file" onChange={handleChange}/>

            {(image) &&
            <img alt="preview" src={URL.createObjectURL(image)} width="200"/>
            }


            {/* <IKUpload
                fileName="test-upload.png"
                /> */}
            <Button variant="contained" onClick={handleSave} size="small" color="primary">Save</Button>


        </Box>
     
    );
  };

export default CreateImageContent;