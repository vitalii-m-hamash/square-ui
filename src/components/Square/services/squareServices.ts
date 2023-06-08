import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../API';

export const getModes = createAsyncThunk('modes/getModes', async () => {
  try {
    const { data } = await client.get('/modes');
    return data;
  } catch (error) {
    console.log(error);
  }
});
