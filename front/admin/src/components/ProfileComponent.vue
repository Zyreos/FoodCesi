<template>
    <h1>My profile</h1>

    <div v-if="!$store.state.isUserLoggedIn">
        Je suis pas connecté 
        
    </div>

    <div v-if="$store.state.isUserLoggedIn">
        Je suis connecté
        <p> Hello, {{ $store.state.user.username}}!</p>
        <p>Age: {{ $store.state.user.age}}</p>
        <p>Email: {{ $store.state.user.email}}</p>
    </div>
</template>