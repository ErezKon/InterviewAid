# 1817. Finding the Users Active Minutes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/finding-the-users-active-minutes](https://leetcode.com/problems/finding-the-users-active-minutes)
**Companies:** Amazon, Twitter

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: HashMap + Set — O(n) ✅](#2-approach-hashmap--set--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given `logs` where `logs[i] = [id, time]`, the **User Active Minutes (UAM)** for user `id` is the number of unique minutes they were active. Return an array `answer` where `answer[j]` = number of users with UAM = j+1.

**Constraints:**
- `1 <= logs.length <= 10⁴`
- `1 <= k <= 10⁵`

---

## 2. Approach: HashMap + Set — O(n) ✅

```
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

## 3. Key Takeaway

> Use a **set per user** to deduplicate minutes, then count users by UAM. O(n) solution.
