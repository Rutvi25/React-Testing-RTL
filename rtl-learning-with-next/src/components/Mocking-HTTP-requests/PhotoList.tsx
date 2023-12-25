import { useEffect, useState } from 'react';
import axios from 'axios';
import { Photo } from '../../pages/api/photos';

export function PhotosList() {
  const [refresh, setRefresh] = useState(0);
  const [name, setName] = useState('');

  return (
    <div>
      <button onClick={() => setRefresh((cr) => ++cr)}>Refresh</button>
      <div>
        <label>
          Your Name:
          <input
            name='Your name'
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </label>
        <List refresh={refresh} name={name} />
      </div>
    </div>
  );
}

function List({ refresh, name }: { refresh: number; name: string }) {
  const [loading, setLoading] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading((l) => l + 1);

      try {
        const r = await axios.get<Photo[]>(`/api/photos?name=${name}`);
        setPhotos(r.data);
        setError('');
      } catch (e: any) {
        setError(e.response.data.message);
      } finally {
        setLoading((l) => l - 1);
      }
    }

    // async function load() {
    //   setLoading(l => l+1);
    //   try {
    //     const r = await fetch(`/api/photos?name=${name}`);
    //     const json = await r.json();
    //     if (!r.ok) {
    //       throw new Error(json.message);
    //     }
    //     setPhotos(json);
    //     setError('');
    //   } catch (e) {
    //     setError(e.message);
    //   } finally {
    //     setLoading(l => l-1);
    //   }
    // }

    void load();
  }, [refresh, name]);

  return (
    <div>
      <div>
        {error ? <div>{error}</div> : null}
        {loading ? <div>Loading...</div> : null}
      </div>

      {photos.map((photo) => (
        <PhotoDetail photo={photo} key={photo.id} />
      ))}
    </div>
  );
}

function PhotoDetail({ photo }: { photo: Photo }) {
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    setFavourite(false);
  }, [photo]);

  return (
    <div>
      <img src={photo.thumbnailUrl} aria-label={photo.title} />
      <div>
        <h2>{photo.title}</h2>
        <h3>PhotoId: {photo.id}</h3>

        <button
          onClick={() => {
            // we already have an example with .catch for this video :)
            void axios
              .post<Photo>('/api/favourite', { ...photo, favourite })
              .then((response) => {
                setFavourite(response.data.favourite);
              });
          }}
        >
          {favourite ? 'Remove from Favourites' : 'Add To Favourites'}
        </button>
      </div>
    </div>
  );
}
