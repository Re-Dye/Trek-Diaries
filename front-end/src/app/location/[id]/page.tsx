'use client'
import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import postStyle from "../[id]/page.module.css";
import {Grid, Modal, Spacer,Textarea,Button,Text, Input} from "@nextui-org/react";
import {MdAddPhotoAlternate} from "react-icons/md";
import axios from "axios";
import ReactStars from "react-stars";

// const labels: { [index: string]: string } = {
//     1: 'Useless',
//     2: 'Poor',
//     3: 'Ok',
//     4: 'Good',
//     5: 'Excellent',
//   };

//   function getLabelText(value: number) {
//     return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
//   }

export default function LocationPage({ params }: { params: { id: string } }) {
    const [visible, setVisible] = useState(false);
    // const [file, setFile] = useState(null);
    // const [filename, setFilename] = useState('');
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
      };
      const [value, setValue] = useState(0);
    //   const [hover, setHover] = useState(-1);
      
    return(
        <div className={postStyle.wrapper}>
            <div className={postStyle.postfield}>
            { params.id }
            <button 
                className={postStyle.btn}
                onClick={handler}>Add Post</button>
            </div>
            <Modal 
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
                width = "600px"
                >
                <Modal.Header>
                    <Grid>
                    <Text h1>Create post</Text>
                    </Grid>
                    <Spacer x={5} />
                    <Grid>
                    <Button
                    // onSubmit={handleSubmit}
                    auto ghost
                    color= "primary"
                    size= "sm"
                    >
                    <MdAddPhotoAlternate /></Button>
                    </Grid>
                    <Spacer x={4} />
                    <Grid xs={1.5}>
                    <Input 
                    placeholder="Upload File" />
                    </Grid>
                      <Spacer y={1} />
                </Modal.Header>
                <Modal.Body>
                <Textarea 
                status="default"
                placeholder="What's on your mind?"
                minRows={1}
                maxRows={10}
                      // value={description}
                    // onChange={event => setDescription(event.target.value) }
                />
                <Grid.Container gap={4}>
                <Grid>
                <Text h5>Scenery</Text>
                <Spacer y={-1.2} x={6.5}/>
                <ReactStars
                    // getLabelText={getLabelText}
                    count={5}
                    size={24}
                    color2={'#ffd700'}
                    value={value} />
                </Grid>
                <Grid>
                <Text h5>Road Condition</Text>
                <Spacer y={-1.2} x={6.5} />
                <ReactStars
                    count={5}
                    size={24}
                    color2={'#ffd700'} />
                </Grid>
                <Grid>
                <Text h5>Experience</Text>
                <Spacer y={-1.2} />
                <ReactStars
                    count={5}
                    size={24}
                    color2={'#ffd700'} />
                </Grid>
                </Grid.Container>
                <Grid>
                <Text h5>Overall Rating</Text>
                <Spacer y={-1.4} />
                <ReactStars
                    count={5}
                    size={34}
                    color2={'#ffd700'} />
                </Grid>
                 {/* <div>
                    <Input  
                    clearable
                    labelPlaceholder="Upload image/Video"
                    onChange={handleFileChange} />
                    <Input
                    label="filename"
                    {filename} />
                </div>                 */}
                </Modal.Body>
                <Modal.Footer>
                 <Button 
                 color="primary"
                 auto ghost>
                 Create Post</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}