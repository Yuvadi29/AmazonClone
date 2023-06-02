/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'fakestoreapi.com']
    },
    env: {
        STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
    }
}

module.exports = nextConfig;


// Here we basically say that the particular domain is used to fetch image from url in the Nextjs application so we assign the domain name here. For every new domain, we will have to add it here.