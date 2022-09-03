import { sanityClient, urlFor, usePreviewSubscription, PortableText, } from "../../lib/Sanity"

const userQuery = `*[_type == "users" && _id == $_id][0]{
    _id,
    first_name,
    last_name,
    email,
    phone_number,
    address,
    dateOfBirth,
    photo
}`;

export default function OneUser({ data }) {
    const { user } = data;
    return (
        
    )
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
        `*[_type == "users" && defined(_id)]{
            "params": {
                "_id": _id 
            }
        }`
    )
    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }){
    const { _id } = params;
    const user = await sanityClient.fetch(userQuery, {_id})

    return { props: { data: { user } } };
}