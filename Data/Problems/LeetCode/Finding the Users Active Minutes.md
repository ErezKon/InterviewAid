# 1817. Finding the Users Active Minutes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/finding-the-users-active-minutes](https://leetcode.com/problems/finding-the-users-active-minutes)
**Companies:** Amazon, Twitter

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: HashMap + Set — O(n) ✅](#2-approach-hashmap--set--on-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given the logs for users' actions on LeetCode, and an integer `k`. The logs are represented by a 2D integer array `logs` where each `logs[i] = [ID_i, time_i]` indicates that the user with `ID_i` performed an action at the minute `time_i`.

**Multiple users** can perform actions simultaneously, and a single user can perform **multiple actions** in the same minute.

The **user active minutes (UAM)** for a given user is defined as the **number of unique minutes** in which the user performed an action on LeetCode. A minute can only be counted once, even if multiple actions occur during it.

You are to calculate a **1-indexed** array `answer` of size `k` such that, for each `j` (`1 <= j <= k`), `answer[j]` is the **number of users** whose **UAM** equals `j`.

Return *the array *`answer`* as described above*.

**Constraints:**
- `1 <= logs.length <= 10^4`
- `0 <= ID_i <= 10^9`
- `1 <= time_i <= 10^5`
- `k` is in the range `[The maximum **UAM** for a user, 10^5]`.

---

## 2. Approach: HashMap + Set — O(n) ✅

```text
FUNCTION findingUsersActiveMinutes(logs, k):
    userMinutes ← HashMap: id → Set of unique minutes
    FOR [id, time] IN logs DO
        userMinutes[id].ADD(time)

    answer ← [0] * k
    FOR user IN userMinutes DO
        uam ← LENGTH(userMinutes[user])
        IF uam <= k THEN answer[uam - 1] += 1

    RETURN answer
```

---

## 3. Examples

**Example 1:**
```
Input: logs = [[0,5],[1,2],[0,2],[0,5],[1,3]], k = 5
Output: [0,2,0,0,0]
Explanation: The user with ID=0 performed actions at minutes 5, 2, and 5 again. Hence, they have a UAM of 2 (minute 5 is only counted once).
The user with ID=1 performed actions at minutes 2 and 3. Hence, they have a UAM of 2.
Since both users have a UAM of 2, answer[2] is 2, and the remaining answer[j] values are 0.
```

**Example 2:**
```
Input: logs = [[1,1],[2,2],[2,3]], k = 4
Output: [1,1,0,0]
Explanation: The user with ID=1 performed a single action at minute 1. Hence, they have a UAM of 1.
The user with ID=2 performed actions at minutes 2 and 3. Hence, they have a UAM of 2.
There is one user with a UAM of 1 and one with a UAM of 2.
Hence, answer[1] = 1, answer[2] = 1, and the remaining values are 0.
```

---

## 4. Walkthrough

| Step | Action | `userMinutes` state |
|------|--------|----------------------|
| 1 | Process [0,5] | {0: {5}} |
| 2 | Process [1,2] | {0:{5}, 1:{2}} |
| 3 | Process [0,2] | {0:{5,2}, 1:{2}} |
| 4 | Process [0,5] (duplicate) | unchanged |
| 5 | Build answer array (k=5) | answer initially [0,0,0,0,0] |
| 6 | User 0 UAM=2 → answer[1]++ | [0,1,0,0,0] |
| 7 | User 1 UAM=1 → answer[0]++ | [1,1,0,0,0] |
| 8 | Final answer | [0,2,0,0,0] |

---

## 5. Complexity Analysis

- **Time:** O(n) – each log entry is processed once.
- **Space:** O(u) – storage for a set per unique user, where u ≤ n.

---

## 6. Follow-Up Questions

- How would you modify the solution to handle a stream of logs where the total number is unknown?
- Can you compute the answer using only O(k) additional space without storing per-user sets?

---

## 7. Key Takeaway

> Use a **set per user** to deduplicate minutes, then count users by UAM. O(n) solution.
