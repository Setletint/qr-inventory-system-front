<template>
    <div class="pt-20 px-6 md:px-16 lg:px-32 bg-base-100 text-base-content min-h-screen">
        <!-- Hero Section -->
        <section class="text-center space-y-6 mb-16">
            <h1 class="text-4xl md:text-6xl font-bold leading-tight">
                Welcome to <span class="text-primary">QR Inventory</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
                A modern and elegant application built with Vue, TypeScript, and TailwindCSS. <br />
                Current Theme is set to: Corporate
            </p>
            <div class="flex justify-center gap-4">
                <a href="/auth?ref=register"><button class="btn btn-primary">Get Started</button></a>
                <button class="btn btn-outline">Learn More</button>
            </div>
        </section>

        <!-- About Project Section -->
        <section class="grid md:grid-cols-2 gap-10 items-center">
            <div>
                <h2 class="text-2xl font-semibold mb-4">What is this project about?</h2>
                <p class="text-gray-600 leading-relaxed">
                    This project for my diploma. The purpose of this web application to allow users make easy-accessible records.
                </p>
            </div>
            <div class="mockup-window border bg-base-200 shadow-lg">
                <div class="flex justify-center px-4 py-10 bg-base-100">
                    <span class="text-gray-400">[My future IMG's will be here]</span>
                </div>
            </div>
        </section>
    </div>
</template>