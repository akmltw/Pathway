import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLinks } from 'store/slice/linkSlice';
import { Button } from 'components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './Shortens.module.scss';

const Shortens = () => {
    const [copiedLinks, setCopiedLink] = useState(null);
    const links = useSelector(selectLinks);

    const copyToClipboard = (link) => {
      navigator.clipboard.writeText(link).then(() => {
        setCopiedLink(link);
      });
    };

    if (!links?.length) return null;

    return (
      <section className={classes.Shortens}>
          <div className='container'>
              {links.map((item, index) => (
                <AnimatePresence key={index}>
                  <motion.div
                    className={classes.item}
                    data-active={copiedLinks === item.shorturl}
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                  >
                    <span>{item.original_link}</span>
                    <span>{item.shorturl}</span>
                    <Button
                      variant="square"
                      onClick={() => copyToClipboard(item.shorturl)}
                    >
                      {copiedLinks === item.shorturl ? 'Copied!' : 'Copy'}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              ))}
          </div>
      </section>
    );
};

export { Shortens };