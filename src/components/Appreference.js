const [favoritesCount, setFavoritesCount] = useState(0);

const getFavoritesCount = async () => {
  try {
    const response = await fetch('http://143.248.253.46:3000/getFavoritesCount');
    if (response.ok) {
      const result = await response.json();
      setFavoritesCount(result.count);
    } else {
      console.error('Network response was not ok.');
    }
  } catch (error) {
    console.error('Error occurred while making the request:', error);
  }
};

useEffect(() => {
  getFavoritesCount();
}, []);

return (
  <Text>{favoritesCount}개의 자격증이 즐겨찾기에 저장되어 있습니다.</Text>
);
