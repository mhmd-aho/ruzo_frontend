export function getOptimizedImageUrl(
    url: string, 
    width = 600, 
    height = 800, 
    operation = "preview", 
    align = ""
): string {
    if (!url) return "";

    try {
        // Check if it is an Uploadcare URL (either default ucarecdn.com or the custom CDN hostname)
        if (url.includes("ucarecdn.com") || url.includes("ucarecd.net")) {
            const urlObj = new URL(url);
            const segments = urlObj.pathname.split("/").filter(Boolean);

            if (segments.length > 0) {
                const uuid = segments[0];

                // Find if there is a filename (last segment with an extension)
                let filename = "";
                const lastSegment = segments[segments.length - 1];
                if (lastSegment && lastSegment.includes(".") && lastSegment !== uuid) {
                    filename = lastSegment;
                }

                // Construct the operation and align segment (e.g. -/preview/600x800/ or -/scale_crop/600x800/top/)
                let opPath = `-/scale_crop/${width}x${height}/top/`;
                if (operation === "preview") {
                    opPath = `-/preview/${width}x${height}/`;
                } else if (operation && align) {
                    opPath = `-/${operation}/${width}x${height}/${align}/`;
                } else if (operation) {
                    opPath = `-/${operation}/${width}x${height}/`;
                }

                // Construct the optimized URL
                let optimizedUrl = `${urlObj.origin}/${uuid}/${opPath}-/quality/smart/-/format/auto/`;
                if (filename) {
                    optimizedUrl += filename;
                }
                return optimizedUrl;
            }
        }
    } catch (e) {
        console.error("Error optimizing image URL:", e);
    }

    return url;
}
