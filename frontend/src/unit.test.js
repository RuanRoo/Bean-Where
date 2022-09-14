test  ("Does it return a Post prop", () => {
    return fetch('http://localhost:4000/api/posts')
    .then(res => res.json())
    .then(data => {
        expect(data).toHaveProperty('title');
    })
})