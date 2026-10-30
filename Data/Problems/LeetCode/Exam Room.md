# 855. Exam Room

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/exam-room](https://leetcode.com/problems/exam-room)
**Companies:** Amazon, Apple, Google, Quora, Samsung, Uber

---

## Problem Description
There is an exam room with `n` seats in a single row labeled from `0` to `n - 1`.

When a student enters the room, they must sit in the seat that maximizes the distance to the closest person. If there are multiple such seats, they sit in the seat with the lowest number. If no one is in the room, then the student sits at seat number `0`.

Design a class that simulates the mentioned exam room.

Implement the `ExamRoom` class:

- `ExamRoom(int n)` Initializes the object of the exam room with the number of the seats `n`.
- `int seat()` Returns the label of the seat at which the next student will set.
- `void leave(int p)` Indicates that the student sitting at seat `p` will leave the room. It is guaranteed that there will be a student sitting at seat `p`.

**Constraints:**
- `1 <= n <= 10^9`
- It is guaranteed that there is a student sitting at seat `p`.
- At most `10^4` calls will be made to `seat` and `leave`.

## Examples
```
Example 1:
  Input:
  ["ExamRoom", "seat", "seat", "seat", "seat", "leave", "seat"]
  [[10], [], [], [], [], [4], []]
  Output:
  [null, 0, 9, 4, 2, null, 5]
  Explanation:
  ExamRoom examRoom = new ExamRoom(10);
  examRoom.seat(); // return 0, no one is in the room, then the student sits at seat number 0.
  examRoom.seat(); // return 9, the student sits at the last seat number 9.
  examRoom.seat(); // return 4, the student sits at the last seat number 4.
  examRoom.seat(); // return 2, the student sits at the last seat number 2.
  examRoom.leave(4);
  examRoom.seat(); // return 5, the student sits at the last seat number 5.
```

## Approach
Maintain a sorted set of occupied seats. For each `seat()` call, consider three candidate intervals:
1. Distance from seat `0` to the first occupied seat.
2. For each pair of consecutive occupied seats, the midpoint gives a candidate distance of half the gap.
3. Distance from the last occupied seat to seat `n-1`.
Select the candidate with the largest distance (breaking ties by smaller index). Insert the chosen seat into the set. `leave(p)` simply removes `p` from the set.

## Pseudocode
```text
CLASS ExamRoom:
    CONSTRUCTOR(n):
        SET totalSeats ← n
        SET occupied ← empty sorted list

    FUNCTION seat():
        IF occupied IS EMPTY:
            occupied.ADD(0)
            RETURN 0
        // candidate from start
        SET bestSeat ← 0
        SET maxDist ← occupied[0]   // distance from seat 0 to first student
        // candidates between occupied seats
        FOR i FROM 0 TO LENGTH(occupied)-2:
            SET left ← occupied[i]
            SET right ← occupied[i+1]
            SET dist ← (right - left) / 2
            SET candidate ← left + dist
            IF dist > maxDist OR (dist == maxDist AND candidate < bestSeat):
                SET maxDist ← dist
                SET bestSeat ← candidate
        // candidate from end
        SET endDist ← totalSeats - 1 - occupied[-1]
        IF endDist > maxDist:
            SET bestSeat ← totalSeats - 1
        occupied.ADD(bestSeat)   // keep list sorted
        RETURN bestSeat

    FUNCTION leave(p):
        occupied.REMOVE(p)
```

## Walkthrough
| Step | Occupied seats before | Action | Occupied seats after |
|------|----------------------|--------|----------------------|
| 1 | [] | seat() → add 0 | [0]
| 2 | [0] | seat() → add 9 (end distance) | [0,9]
| 3 | [0,9] | seat() → midpoint 4 | [0,4,9]
| 4 | [0,4,9] | leave(0) → remove 0 | [4,9]
| 5 | [4,9] | seat() → start distance 4 → seat 0 | [0,4,9]

## Complexity Analysis
- **Time:** O(k) for `seat()` where k is the number of occupied seats (iteration over gaps). `leave()` is O(log k) if a balanced tree is used; here we assume O(k) for list removal.
- **Space:** O(k) to store occupied seats.

## Follow‑Up Questions
- How would you improve `seat()` to O(log k) using a priority queue of intervals?
- Can you support a very large `n` (e.g., 10⁹) with sparse occupancy?
- How would you modify the design to handle multiple exam rooms simultaneously?

## Key Takeaway
A sorted structure of occupied seats lets you examine gaps efficiently, enabling the greedy choice of the farthest seat for each arriving student.
