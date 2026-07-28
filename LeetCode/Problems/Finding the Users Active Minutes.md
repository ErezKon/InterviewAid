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

Given `logs` where `logs[i] = [id, time]`, the **User Active Minutes (UAM)** for user `id` is the number of unique minutes they were active. Return an array `answer` where `answer[j]` = number of users with UAM = j+1.

**Constraints:**
- `1 <= logs.length <= 10⁴`
- `1 <= k <= 10⁵`

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
logs = [[0,5],[1,2],[0,2],[0,5]], k = 5
```
User 0 has active minutes {5,2} → UAM = 2.
User 1 has active minutes {2} → UAM = 1.
Answer = [0,2,0,0,0] (0 users with UAM=1, 2 users with UAM=2, rest 0).

**Example 2:**
```
logs = [[1,1],[2,2],[2,2]], k = 3
```
User 1 → {1} → UAM=1.
User 2 → {2} → UAM=1 (duplicate minute ignored).
Answer = [2,0,0].

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
- Can you compute the answer using only O(k) additional space without storing per‑user sets?

---

## 7. Key Takeaway

> Use a **set per user** to deduplicate minutes, then count users by UAM. O(n) solution.
