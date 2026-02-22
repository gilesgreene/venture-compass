import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { FieldActionsResolver } from 'sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false
})
