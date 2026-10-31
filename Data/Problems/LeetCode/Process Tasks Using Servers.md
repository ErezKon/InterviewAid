# 1882. Process Tasks Using Servers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/process-tasks-using-servers](https://leetcode.com/problems/process-tasks-using-servers)
**Companies:** Amazon, Google, Linkedin, Tiktok, Twitter

---

## Problem Description

You are given two **0-indexed** integer arrays `servers` and `tasks` of lengths `n` and `m` respectively. `servers[i]` is the **weight** of the `i`th server, and `tasks[j]` is the **time needed** to process the `j`th task **in seconds**.

Tasks are assigned to the servers using a **task queue**. Initially, all servers are free, and the queue is **empty**.

At second `j`, the `j`th task is **inserted** into the queue (starting with the `0`th task being inserted at second `0`). As long as there are free servers and the queue is not empty, the task in the front of the queue will be assigned to a free server with the **smallest weight**, and in case of a tie, it is assigned to a free server with the **smallest index**.

If there are no free servers and the queue is not empty, we wait until a server becomes free and immediately assign the next task. If multiple servers become free at the same time, then multiple tasks from the queue will be assigned **in order of insertion** following the weight and index priorities above.

A server that is assigned task `j` at second `t` will be free again at second `t + tasks[j]`.

Build an array `ans` of length `m`, where `ans[j]` is the **index** of the server the `j`th task will be assigned to.

Return *the array* `ans`.

**Constraints:**
- `servers.length == n`
- `tasks.length == m`
- `1 <= n, m <= 2 * 10^5`
- `1 <= servers[i], tasks[j] <= 2 * 10^5`

## Examples

**Example 1:**
```
Input: servers = [3,3,2], tasks = [1,2,3,2,1,2]
Output: [2,2,0,2,1,2]
Explanation: Events in chronological order go as follows:
- At second 0, task 0 is added and processed using server 2 until second 1.
- At second 1, server 2 becomes free. Task 1 is added and processed using server 2 until second 3.
- At second 2, task 2 is added and processed using server 0 until second 5.
- At second 3, server 2 becomes free. Task 3 is added and processed using server 2 until second 5.
- At second 4, task 4 is added and processed using server 1 until second 5.
- At second 5, all servers become free. Task 5 is added and processed using server 2 until second 7.
```

**Example 2:**
```
Input: servers = [5,1,4,3,2], tasks = [2,1,2,4,5,2,1]
Output: [1,4,1,4,1,3,2]
Explanation: Events in chronological order go as follows:
- At second 0, task 0 is added and processed using server 1 until second 2.
- At second 1, task 1 is added and processed using server 4 until second 2.
- At second 2, servers 1 and 4 become free. Task 2 is added and processed using server 1 until second 4.
- At second 3, task 3 is added and processed using server 4 until second 7.
- At second 4, server 1 becomes free. Task 4 is added and processed using server 1 until second 9.
- At second 5, task 5 is added and processed using server 3 until second 7.
- At second 6, task 6 is added and processed using server 2 until second 7.
```

## Approach
We maintain two min-heaps:
1. **available** – `(weight, index)` of free servers.
2. **busy** – `(freeTime, weight, index)` of servers currently processing a task.
For each second `t` (task index), we first move any servers whose `freeTime ≤ t` from `busy` back to `available`. If `available` is non-empty we pop the smallest server, assign the task, and push it into `busy` with `freeTime = t + tasks[t]`. If no server is free, we pop the earliest finishing server from `busy`, assign the task at its `freeTime`, and push it back with an updated `freeTime`.

```text
FUNCTION assignTasks(servers, tasks):
    available ← MinHeap([(w, i) FOR i, w IN ENUMERATE(servers)])
    busy ← MinHeap()               // (freeTime, weight, index)
    result ← []
    FOR t, task IN ENUMERATE(tasks):
        // release servers that finished by time t
        WHILE busy NOT EMPTY AND busy.PEEK()[0] ≤ t:
            (_, w, idx) ← busy.POP()
            available.PUSH((w, idx))
        IF available NOT EMPTY:
            (w, idx) ← available.POP()
            result.APPEND(idx)
            busy.PUSH((t + task, w, idx))
        ELSE:
            (freeTime, w, idx) ← busy.POP()
            result.APPEND(idx)
            busy.PUSH((freeTime + task, w, idx))
    RETURN result
```

## Walkthrough
| Time | Task | Available Servers (weight,index) | Busy Servers (freeTime,weight,index) | Assigned Server |
|------|------|----------------------------------|--------------------------------------|-----------------|
| 0    | 1    | (2,2),(3,0),(3,1)                | –                                    | 2               |
| 1    | 2    | (3,0),(3,1)                      | (1,2,2)                              | 0               |
| 2    | 3    | (3,1)                            | (1,2,2),(3,0,0)                      | 1               |
| …    | …    | …                                | …                                    | …               |

## Complexity Analysis
- **Time:** Each server is pushed/popped from a heap at most once per task → `O(n log k)`, where `n = len(tasks)` and `k = len(servers)`.
- **Space:** Two heaps store at most `k` servers → `O(k)`.

## Follow-Up Questions
1. How would the solution change if tasks could arrive at arbitrary timestamps instead of one per second?
2. Can the algorithm be adapted to prioritize servers based on a custom ranking function?
3. What modifications are needed to return the exact start time of each task?

## Key Takeaway
Using two priority queues—one for free servers and one for busy servers—allows us to always pick the lightest available server in logarithmic time, handling both immediate assignments and waiting efficiently.
