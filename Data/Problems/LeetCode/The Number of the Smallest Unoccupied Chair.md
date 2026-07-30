# 1942. The Number of the Smallest Unoccupied Chair

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair](https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Spinny

---

## Problem Description
You are given a list `times` where `times[i] = [arrival_i, leaving_i]` denotes the arrival and leaving times of the i‑th friend at a party. When a friend arrives, they sit on the smallest numbered unoccupied chair. When they leave, their chair becomes available again. Given `targetFriend`, return the chair number assigned to that friend.

## Examples
**Example 1:**
```
times = [[1,4],[2,3],[4,6]]
targetFriend = 1
Output = 1
```
Friend 0 takes chair 0, friend 1 arrives while chair 0 is occupied so takes chair 1, then leaves before friend 2 arrives, freeing chair 1 which friend 2 then takes.

**Example 2:**
```
times = [[3,10],[1,5],[2,6]]
targetFriend = 0
Output = 2
```
Chairs are allocated in order of arrival, always choosing the smallest free index.

## Approach
Process all arrival and departure events in chronological order. Maintain a min‑heap of available chair indices and a map from friend to assigned chair. When a departure occurs, push the freed chair back into the heap. When an arrival occurs, pop the smallest chair from the heap, assign it, and if this is the target friend, return it.

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
Using a min‑heap to track free chairs while processing chronologically gives the smallest available seat to each arriving friend efficiently.
