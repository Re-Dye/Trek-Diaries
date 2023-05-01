'use client'

import { useRef, useState, useEffect } from "react";


interface Post {
    _id: string;
    address: string;
    description: string;
    imageURL: string;
    likes: number;
  }

const POST_PER_PAGE = 5;

async function fetchLocationPosts(
    locationId: string,
    page: number,
    searchTime: Date
  ) {
    const encodedLocation: any = encodeURI(locationId);
    const encodedPage: any = encodeURI(page);
    const encodedSearchTime: any = encodeURI(searchTime.toISOString());
    const res: any = await fetch(
      `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/getLocationPosts?locationId=${encodedLocation}&page=${encodedPage}&searchTime=${encodedSearchTime}`,
      { cache: "no-store" }
    );
    return res.json();
  }

export default function Posts({locationId}:{locationId: string}) {

    console.log(locationId)
    const check: boolean = useFetchPosts(locationId);

    return(
        <div className="PostBody">
            <h1>Location</h1>
            <h2>Description</h2>
            <h3>Image</h3>
            <h4>Likes</h4>
        </div>
    )
    
}

function useFetchPosts( locationId: string ):[
    posts: Array<Post>,
    fetchPost: Function,
    hasMore: boolean,
    didMount: boolean
  ] {
    const page = useRef<number>(0);
    const searchTime = useRef<Date>(new Date());
    const [posts, setPosts] = useState<Array<Post>>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [didMount, setDidMount] = useState<boolean>(false);
  
    // const fetchPosts = async () => {
    //   console.log("Fetch called");
    //   try {
    //     /* fetch more posts */
    //     const fetchedPosts: Array<> = await fetchLocationPosts(
    //       locationId as string,
    //       page.current,
    //       searchTime.current
    //     );
    //         console.log(fetchedPosts)
    //     /* add the locations to the existing locations */
    //     setPosts((posts) => [...posts, ...fetchedPosts]);
  
    //     /* update page and has more */
    //     // page.current = page.current + 1;
    //     // setHasMore(!(fetchedLocations.length < LOCATIONS_PER_SCROLL));
    //   } catch (error) {
    //     console.error(error); 
    //     alert(error);
    //   }
      useEffect(() => {
        if (!didMount) {
            console.log("inside fetch didMount")
            try{
                const fetchPost = async() => {
                    /* fetch more locations */
                    const fetchedPosts: Array<Posts> = await fetchLocationPosts(locationId as string, page.current, searchTime.current)
                    console.log(fetchedPosts);
                    /* add the locations to the existing locations */
                    setPosts(fetchedPosts);
        
                    /* update page and has more */
                    // page.current = 1
                    // setHasMore(!(fetchedLocations.length < LOCATIONS_PER_SCROLL))
                    setDidMount(true)
                }
                fetchPost()
            }catch(error){
                alert(error)
                console.error(error)
            }
        }
    }, [])

    return true;
};
  