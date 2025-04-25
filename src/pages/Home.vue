<template>
    <div class="pt-20 sm:pt-30  px-6 md:px-16 lg:px-32 bg-base-100 text-base-content min-h-screen">
        <!-- Hero Section -->
        <section class="text-center space-y-6 mb-16">
            <h1 class="text-4xl md:text-6xl font-bold leading-tight">
                Welcome to <span class="text-primary">QR Inventory</span>
            </h1>
            <p class="text-xl md:text-lg text-gray-500 max-w-2xl mx-auto">
                Our app is a modern solution for inventory tracking that allows organizations to create their own profiles and manage any kind of items — from simple colored markers to specialized equipment. Each item can have a unique record with a generated QR code for quick access and updates.
            </p>
            <div class="flex justify-center gap-4">
                <a href="/auth?ref=register"><button class="btn btn-primary">Get Started</button></a>
                <button class="btn btn-outline">Learn More</button>
            </div>
        </section>

        <!-- About Project Section -->
        <section class="grid md:grid-cols-2 gap-12 items-center px-6 py-12 rounded-2xl">
            <!-- Text Content -->
            <div class="text-center md:text-left">
                <h2 class="text-4xl font-bold mb-6 text-primary">Easy & Fast Access</h2>
                <p class="text-gray-700 text-lg leading-relaxed">
                    This web application is part of my diploma project, designed to help users create and manage
                    easily accessible records using QR codes. It's fast, practical, and user-friendly—perfect for
                    organizing information in a modern way.
                </p>
            </div>

            <!-- Image Card -->
            <div
                class="card bg-base-100 w-full max-w-md mx-auto shadow-sm rounded-xl transition-transform hover:scale-105 duration-300">
                <figure class="">
                    <img src="/main_page01.png" alt="QR code near plant" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title text-2xl text-primary">Place QR Codes Anywhere</h2>
                    <p class="text-gray-600">
                        Generate and print QR codes you can place on walls, desks, or any surface—bringing your data
                        just a scan away.
                    </p>
                </div>
            </div>
        </section>

    </div>
</template>