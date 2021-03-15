import Logo from "./components/Logo";
import TrackEditor from "./components/TrackEditor";
import TrackList from "./components/TrackList";

import styles from './styles/App.module.css';

export default function App() {
  return (
    <section className={styles.container}>
      <Logo/>
      <TrackEditor/>
      <TrackList />
    </section>
  );
};
