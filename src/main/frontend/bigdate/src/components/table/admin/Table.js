import React from 'react';

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>일자</th>
          <th>가입</th>
          <th>탈퇴</th>
          <th>글</th>
          <th>댓글</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2023.04.02</td>
          <td>4</td>
          <td>0</td>
          <td>4</td>
          <td>5</td>
        </tr>
        <tr>
          <td>2023.04.01</td>
          <td>2</td>
          <td>0</td>
          <td>2</td>
          <td>7</td>
        </tr>
        <tr>
          <td>2023.03.31</td>
          <td>1</td>
          <td>0</td>
          <td>1</td>
          <td>10</td>
        </tr>
        <tr>
          <td>2023.03.30</td>
          <td>6</td>
          <td>0</td>
          <td>6</td>
          <td>4</td>
        </tr>
        <tr>
          <td>2023.03.29</td>
          <td>4</td>
          <td>1</td>
          <td>4</td>
          <td>8</td>
        </tr>
        <tr>
          <td>2023.03.28</td>
          <td>19</td>
          <td>0</td>
          <td>19</td>
          <td>30</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;