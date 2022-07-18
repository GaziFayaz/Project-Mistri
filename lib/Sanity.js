import {
  createClient,
  createPortableTextComponent,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from "next-sanity";

const config = {
  projectId: "k4gt4798",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false,
};

export const sanityClient = createClient(config);

export const urlFor = source =>
  createImageUrlBuilder(config).image(source);

export const imageBuilder = source =>
  createImageUrlBuilder(config).image(source);

export const usePreviewSubscription =
  createPreviewSubscriptionHook(config);


  // Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
    ...config,
    // Serializers passed to @sanity/block-content-to-react
    // (https://github.com/sanity-io/block-content-to-react)
    serializers: {
      types: {
        code: props => (
          <pre data-language={props.node.language}>
            <code>{props.node.code}</code>
          </pre>
        )
      },
    }
  });
