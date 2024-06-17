import React from 'react';
import styles from './AddUsers.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';

const AddUsers = () => {
  return (
    <Card className={styles.input}>
      <form>
        <label htmlFor="username">이름</label>
        <input
          id="username"
          type="text"
        />
        <label htmlFor="age">나이</label>
        <input
          id="age"
          type="number"
        />
        <Button type="submit">가입하기</Button>
      </form>
    </Card>
  );
};

export default AddUsers;
