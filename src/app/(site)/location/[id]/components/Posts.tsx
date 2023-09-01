'use client'
import LoadingPost from "@/app/(site)/components/LoadingPost/LoadingPost";
import ViewPost from "../../../components/viewPost/viewPost"
import { useRef, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";


interface Post {
    _id: string;
    address: string;
    description: string;
    imageURL: string;
    likes: number;
    location: any;
    pictureURL: string;
    owner: any;
    rating: {
      overallScore: number;
    }
  }

const POSTS_PER_SCROLL = 7;

async function fetchLocationPosts(
    locationId: string,
    page: number,
    searchTime: Date
  ) {
    const encodedLocation: any = encodeURI(locationId);
    const encodedPage: string = encodeURI(page.toString());
    const encodedSearchTime: any = encodeURI(searchTime.toISOString());
    const res: any = await fetch(
      `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/getLocationPosts?locationId=${encodedLocation}&page=${encodedPage}&searchTime=${encodedSearchTime}`,
      { cache: "no-store" }
    );
    return res.json();
  }

export default function Posts({ locationId }:{ locationId: string }) {
    const [posts, fetchPosts, hasMore, didMount] = useFetchPosts(locationId);

    return(
        <div className="PostBody">
            {didMount && <>
                    {(posts.length) &&
                        <InfiniteScroll
                            dataLength={ posts.length } //This is important field to render the next data
                            next={ fetchPosts as any }
                            hasMore={ hasMore }
                            loader={<LoadingPost/>}
                            endMessage={
                              <p style={{ textAlign: 'center' }}>
                              <b>Yay! You have seen it all</b>
                              </p>
                            }
                        >
                            {
                                posts.map((post) => (
                                    <ViewPost
                                        key={ post._id }
                                        id={ post._id }
                                        location={ post.location }
                                        description={ post.description }
                                        likes = {post.likes}
                                        imageURL = {post.pictureURL}
                                        owner = {post.owner}
                                        rating = { post.rating?.overallScore || 0 }
                                    />
                                ))
                            }
                        </InfiniteScroll>
                    }
                    {!(posts.length) && <h1>Not Found!</h1>}
                </>
            }
            {!didMount} 
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
  
    const fetchPosts = async () => {
      console.log("Fetch called");
      try {
        /* fetch more posts */
        const fetchedPosts: Array<any> = await fetchLocationPosts(
          locationId as string,
          page.current,
          searchTime.current
        );

        /* add the locations to the existing locations */
        setPosts((posts) => [...posts, ...fetchedPosts]);
  
        /* update page and has more */
        page.current = page.current + 1;
        setHasMore(!(fetchedPosts.length < POSTS_PER_SCROLL))
      } catch (error) {
        console.error(error); 
        alert(error);
      }
    }

      /* fetch data on the render */
      useEffect(() => {
        if (!didMount) {
            try{
                const fetchPost = async() => {
                    /* fetch more posts */
                    const fetchedPosts: Array<any> = await fetchLocationPosts(locationId as string, page.current, searchTime.current)

                    console.log(fetchedPosts);
                    /* add the locations to the existing locations */
                    setPosts(fetchedPosts);
        
                    /* update page and has more */
                    page.current = 1
                    setHasMore(!(fetchedPosts.length < POSTS_PER_SCROLL))
                    setDidMount(true)
                }
                fetchPost()
            }catch(error){
                alert(error)
                console.error(error)
            }
          }
        }, [])
    return  [posts, fetchPosts, hasMore, didMount];
    };
  
  