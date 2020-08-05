import React, { useState, useEffect, createRef } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CardContent,
} from '@material-ui/core';
import classNames from 'classnames';
import useStyles from './styles';

const NewsCard = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  id,
  activeArticle,
}) => {
  const [elRefs, setElRefs] = useState([]);

  const classes = useStyles();

  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    setElRefs((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    );
  }, []);

  useEffect(() => {
    if (id === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [id, activeArticle, elRefs]);

  return (
    <Card
    ref={elRefs[id]}
      className={classNames(
        classes.card,
        activeArticle === id ? classes.activeCard : null
      )}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia
          className={classes.media}
          image={
            urlToImage ||
            'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'
          }
          title={title}
        />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary">
            Learn More...
          </Button>
          <Typography variant="h5" color="textSecondary">
            {id + 1}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;
