// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {probes} from '../../data'
export default (req, res) => {
  res.status(200).json(probes)
}
