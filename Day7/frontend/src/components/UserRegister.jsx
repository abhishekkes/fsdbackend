const UserRegister = () => {
    const handleRegister = async (e) => {
      e.preventDefault()
      const { username, email, password } = e.target
      const data = { username, email, password }
      const resp = await fetch('http://localhost:8000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await resp.json()
      console.log(result);
      alert("User Registered");
    }
  return (
    <div>
      <form onSubmit={handleRegister}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default UserRegister
