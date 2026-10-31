# 1942. The Number of the Smallest Unoccupied Chair

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair](https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Spinny

---

## Problem Description
There is a party where `n` friends numbered from `0` to `n - 1` are attending. There is an **infinite** number of chairs in this party that are numbered from `0` to `infinity`. When a friend arrives at the party, they sit on the unoccupied chair with the **smallest number**.

- For example, if chairs `0`, `1`, and `5` are occupied when a friend comes, they will sit on chair number `2`.

When a friend leaves the party, their chair becomes unoccupied at the moment they leave. If another friend arrives at that same moment, they can sit in that chair.

You are given a **0-indexed** 2D integer array `times` where `times[i] = [arrival_i, leaving_i]`, indicating the arrival and leaving times of the `i`-th friend respectively, and an integer `targetFriend`. All arrival times are **distinct**.

Return *the **chair number** that the friend numbered* `targetFriend` *will sit on*.

**Constraints:**
- `n == times.length`
- `2 <= n <= 10^4`
- `times[i].length == 2`
- `1 <= arrival_i < leaving_i <= 10^5`
- `0 <= targetFriend <= n - 1`
- Each `arrival_i` time is **distinct**.

## Examples
```
Example 1:
  Input: times = [[1,4],[2,3],[4,6]], targetFriend = 1
  Output: 1
  Explanation:
  - Friend 0 arrives at time 1 and sits on chair 0.
  - Friend 1 arrives at time 2 and sits on chair 1.
  - Friend 1 leaves at time 3 and chair 1 becomes empty.
  - Friend 0 leaves at time 4 and chair 0 becomes empty.
  - Friend 2 arrives at time 4 and sits on chair 0.
  Since friend 1 sat on chair 1, we return 1.
```
```
Example 2:
  Input: times = [[3,10],[1,5],[2,6]], targetFriend = 0
  Output: 2
  Explanation:
  - Friend 1 arrives at time 1 and sits on chair 0.
  - Friend 2 arrives at time 2 and sits on chair 1.
  - Friend 0 arrives at time 3 and sits on chair 2.
  - Friend 1 leaves at time 5 and chair 0 becomes empty.
  - Friend 2 leaves at time 6 and chair 1 becomes empty.
  - Friend 0 leaves at time 10 and chair 2 becomes empty.
  Since friend 0 sat on chair 2, we return 2.
```

## Approach
Process all arrival and departure events in chronological order. Maintain a min-heap of available chair indices and a map from friend to assigned chair. When a departure occurs, push the freed chair back into the heap. When an arrival occurs, pop the smallest chair from the heap, assign it, and if this is the target friend, return it.

```text
FUNCTION smallestChair(times, targetFriend):
    events ← LIST()
    FOR i FROM 0 TO LENGTH(times)-1:
        (arr, leave) ← times[i]
        APPEND events, (arr, "arrive", i)
        APPEND events, (leave, "leave", i)
    SORT events BY time ASC, type ("leave" before "arrive" if same time)

    available ← MIN-HEAP OF INTEGERS
    FOR i FROM 0 TO LENGTH(times)-1:
        INSERT available, i   // initially all chairs are free
    assigned ← MAP FROM friend TO chair

    FOR (time, type, friend) IN events:
        IF type = "leave":
            PUSH available, assigned[friend]
        ELSE: // arrive
            chair ← POP available
            SET assigned[friend] ← chair
            IF friend = targetFriend:
                RETURN chair
    RETURN -1  // should never happen
```
The heap ensures the smallest free chair is always chosen.

## Walkthrough
| Time | Event | Action | Available chairs | Assigned |
|------|-------|--------|------------------|----------|
| 1    | arrive 0 | pop 0 → chair 0 | {1,2,...} | {0→0} |
| 2    | arrive 1 | pop 1 → chair 1 | {2,3,...} | {0→0,1→1} |
| 3    | leave 1  | push 1 back | {1,2,3,...} | {0→0} |
| 4    | arrive 2 (target) | pop 1 → chair 1 | {2,3,...} | {0→0,2→1} → return 1 |

## Complexity Analysis
- **Time:** O(n log n) for sorting events and heap operations, where n is the number of friends.
- **Space:** O(n) for the events list, heap, and assignment map.

## Follow-Up Questions
1. How would you modify the algorithm to handle multiple friends arriving or leaving at the exact same timestamp?
2. Can the solution be implemented without a heap using a balanced binary search tree?
3. How would you extend the problem to return the full seating schedule for all friends?

## Key Takeaway
Using a min-heap to track free chairs while processing chronologically gives the smallest available seat to each arriving friend efficiently.
