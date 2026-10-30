# 3815. Design Auction System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-auction-system](https://leetcode.com/problems/design-auction-system)
**Companies:** Google

---

## Problem Description

You are asked to design an auction system that manages bids from multiple users in real time.

Each bid is associated with a `userId`, an `itemId`, and a `bidAmount`.

Implement the `AuctionSystem` class:

- `AuctionSystem()`: Initializes the `AuctionSystem` object.
- `void addBid(int userId, int itemId, int bidAmount)`: Adds a new bid for `itemId` by `userId` with `bidAmount`. If the same `userId` **already** has a bid on `itemId`, **replace** it with the new `bidAmount`.
- `void updateBid(int userId, int itemId, int newAmount)`: Updates the existing bid of `userId` for `itemId` to `newAmount`. It is **guaranteed** that this bid *exists*.
- `void removeBid(int userId, int itemId)`: Removes the bid of `userId` for `itemId`. It is **guaranteed** that this bid *exists*.
- `int getHighestBidder(int itemId)`: Returns the `userId` of the **highest** bidder for `itemId`. If multiple users have the **same highest** `bidAmount`, return the user with the **highest** `userId`. If no bids exist for the item, return -1.

**Constraints:**

- `1 <= userId, itemId <= 5 * 10^4`
- `1 <= bidAmount, newAmount <= 10^9`
- At most `5 * 10^4` total calls to `addBid`, `updateBid`, `removeBid`, and `getHighestBidder`.
- The input is generated such that for `updateBid` and `removeBid`, the bid from the given `userId` for the given `itemId` will be valid.

---

## Examples

```
Example 1:
  Input:
  ["AuctionSystem", "addBid", "addBid", "getHighestBidder", "updateBid", "getHighestBidder", "removeBid", "getHighestBidder", "getHighestBidder"]
  [[], [1, 7, 5], [2, 7, 6], [7], [1, 7, 8], [7], [2, 7], [7], [3]]
  Output:
  [null, null, null, 2, null, 1, null, 1, -1]
  Explanation:
  AuctionSystem auctionSystem = new AuctionSystem(); // Initialize the Auction system
  auctionSystem.addBid(1, 7, 5); // User 1 bids 5 on item 7
  auctionSystem.addBid(2, 7, 6); // User 2 bids 6 on item 7
  auctionSystem.getHighestBidder(7); // return 2 as User 2 has the highest bid
  auctionSystem.updateBid(1, 7, 8); // User 1 updates bid to 8 on item 7
  auctionSystem.getHighestBidder(7); // return 1 as User 1 now has the highest bid
  auctionSystem.removeBid(2, 7); // Remove User 2's bid on item 7
  auctionSystem.getHighestBidder(7); // return 1 as User 1 is the current highest bidder
  auctionSystem.getHighestBidder(3); // return -1 as no bids exist for item 3
```

---

## Approach

```text
CLASS AuctionSystem:
    SET auctions ← empty map   // auctionId → {endTime, active, bidsHeap}
    SET nextId ← 1

    FUNCTION createAuction(endTime):
        SET auctions[nextId] ← {endTime: endTime, active: true, bidsHeap: empty max‑heap}
        SET id ← nextId
        INCREMENT nextId
        RETURN id

    FUNCTION placeBid(auctionId, userId, amount):
        IF auctionId NOT IN auctions OR NOT auctions[auctionId].active:
            RETURN // ignore invalid or ended auction
        PUSH (amount, userId) INTO auctions[auctionId].bidsHeap

    FUNCTION endAuction(auctionId):
        IF auctionId NOT IN auctions OR NOT auctions[auctionId].active:
            RETURN null
        SET auctions[auctionId].active ← false
        IF auctions[auctionId].bidsHeap IS EMPTY:
            RETURN null
        SET (maxAmount, winner) ← POP_MAX(auctions[auctionId].bidsHeap)
        RETURN winner
```

---

## Walkthrough

| Step | Operation | State Change | Explanation |
|------|-----------|--------------|-------------|
| 1 | `createAuction(10)` | auctions{1:{endTime:10, active:true, heap:[]}} | New auction id 1 created |
| 2 | `placeBid(1,100,5)` | heap → [(5,100)] | User 100 bids $5 |
| 3 | `placeBid(1,150,7)` | heap → [(7,150),(5,100)] | User 150 bids $7, becomes max |
| 4 | `endAuction(1)` | active:false, winner=150 | Auction ends, max‑heap yields winner 150 |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | `createAuction`: O(1); `placeBid`: O(log b) where b is number of bids for that auction; `endAuction`: O(log b) to pop max |
| **Space** | O(a + b) where a is number of auctions and b total bids stored |

---

## Follow-Up Questions

1. How would you support retrieving the top‑k highest bids without ending the auction?
2. How can you handle tie‑breaking when multiple bids have the same amount?
3. How would you persist auction data to survive server crashes?

---

## Key Takeaway

> **Use a max‑heap per auction to manage bids efficiently; it gives O(log n) insertion and O(1) access to the highest bid.**