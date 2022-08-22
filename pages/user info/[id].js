import { sanityClient, urlFor, usePreviewSubscription, PortableText, } from "../../lib/Sanity"

const userQuery = `*[_type == "user1" && id.current == $id][0]`{
    _id
}

export default function OneUser() {

}

export async function getStaticPaths() {

}

export async function getStaticProps(){

}