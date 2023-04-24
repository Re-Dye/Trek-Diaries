'use client'
import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import postStyle from "../[address]/page.module.css";
import { Modal, Spacer } from "@nextui-org/react";
import { Textarea } from '@nextui-org/react';
import { Button } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import {MdAddPhotoAlternate} from "react-icons/md";

export default function LocationPage({ params }: { params: { address: string } }) {
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
      };

    return(
        <div className={postStyle.wrapper}>
            <div className={postStyle.postfield}>
            { params.address }
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
                    <div>
                    <Text h2>Create a post</Text>
                    </div>
                    <Spacer y={1} x={8} />
                    <div>
                    <Button
                    auto ghost
                    color= "primary"
                    size= "sm"
                    >
                    <MdAddPhotoAlternate /></Button>
                    </div>
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