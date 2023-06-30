import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard.jsx";

const users = [
  {
    username: "vinoypastillas",
    name: "cuenta falopa de tw",
    isFollowing: false
  },
  {
    username: "_sAntics",
    name: "santi",
    isFollowing: true
  }
]

export function App() {
  return (
    <section className="App">
      <TwitterFollowCard
        username="darojg"
        name="Dario Gomez"
        initialIsFollowing
      />
      <TwitterFollowCard
        username="DavooXeneizeJRR"
        name="Puerro"
        initialIsFollowing={false} />
      {
        users.map(user => {
          const { username, name, isFollowing } = user
          return (
            <TwitterFollowCard key={username} username={username} name={name} initialIsFollowing={isFollowing} />
          )
        })
      }
    </section>
  )
}
