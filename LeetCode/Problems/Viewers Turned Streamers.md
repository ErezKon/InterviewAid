# 2995. Viewers Turned Streamers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/viewers-turned-streamers](https://leetcode.com/problems/viewers-turned-streamers)
**Companies:** Google, Phonepe

---

## Problem Description
You are given an integer `n` representing the number of users on a platform. Each user may follow other users, forming a directed graph of follower relationships. A *viewer* is a user who follows at least one other user but is not followed by anyone. A *streamer* is a user who is followed by at least one other user. In one operation you can convert a viewer into a streamer by adding a single outgoing edge from that viewer to any existing streamer. Return the minimum number of operations required to ensure that every user is either a streamer or follows at least one streamer.

## Examples
**Example 1:**
```
Input: n = 4, follows = [[2,3],[4,1]]
Output: 1
Explanation: User 2 follows 3 and user 4 follows 1. Users 1 and 3 have followers, so they are streamers. Users 2 and 4 are viewers. Adding an edge from 2 → 1 makes user 2 a streamer, satisfying the condition with 1 operation.
```
**Example 2:**
```
Input: n = 3, follows = []
Output: 2
Explanation: No one follows anyone. We need to create edges so that at least two users become streamers (e.g., 1→2 and 2→3). After that, user 3 follows a streamer, and all users satisfy the requirement.
```

## Approach
Treat the graph as a set of connected components. Count the number of users with zero incoming edges (pure viewers). Each such user must either become a streamer or follow an existing streamer. The minimum operations equal the number of pure viewers minus one (if there is at least one existing streamer), otherwise it equals the number of users minus one.

```text
FUNCTION minOperations(n, follows):
    indegree ← ARRAY of size n initialized to 0
    FOR each [u, v] IN follows:
        indegree[v-1] ← indegree[v-1] + 1
    viewerCount ← COUNT of i where indegree[i] = 0
    streamerExists ← ANY indegree[i] > 0
    IF streamerExists:
        RETURN viewerCount - 1
    ELSE:
        RETURN n - 1
```

## Walkthrough
For the first example:
- indegree: [1,0,1,0] → viewers = {2,4}, streamers exist.
- Operations = 2 - 1 = 1.

## Complexity Analysis
- **Time:** O(m + n) where m is number of follow edges.
- **Space:** O(n) for the indegree array.

## Follow‑Up Questions
1. How would the solution change if each user could follow multiple streamers simultaneously?
2. Can we minimize the total number of added edges while also minimizing the maximum indegree of any streamer?
3. What if the graph must remain acyclic after adding edges?

## Key Takeaway
Counting users with zero indegree reveals the minimal number of edge additions needed to convert pure viewers into streamers.
