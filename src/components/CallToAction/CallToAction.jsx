import { Button } from 'components/Button'
import classes from './CallToAction.module.scss';

const CallToAction = () => {
  return (
    <section className={classes.CallToAction}>
      <h2>Boost your links today</h2>
      <Button>Get Started</Button>
    </section>
  )
}

export { CallToAction };