import { WatchedList } from './watched-list'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('Core: WatchedList', () => {
  it('should be able to compare items', () => {
    const list = new NumberWatchedList()

    expect(list.compareItems(1, 1)).toBe(true)
  })

  it('should be able to create a watched list with initial items', () => {
    const initialList = [1, 2, 3]
    const list = new NumberWatchedList(initialList)

    expect(list.currentItems).toHaveLength(initialList.length)
    expect(list.currentItems).toEqual(initialList)
  })

  it('should be able to add new items to the list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    const newItems = [4, 5, 6]
    list.add(newItems[0])
    list.add(newItems[1])
    list.add(newItems[2])

    expect(list.currentItems).toHaveLength(6)
    expect(list.getNewItems()).toEqual(newItems)
  })

  it('should be able to remove items from the list', () => {
    const list = new NumberWatchedList([1, 2, 3, 4])

    const removedItems = [2, 3]
    list.remove(removedItems[0])
    list.remove(removedItems[1])

    expect(list.currentItems).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual(removedItems)
  })

  it('should be able to add an item even if it was removed before', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(2)
    list.add(2)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  it('should be able to remove an item even if it was added before', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)
    list.remove(4)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  it('should be able to update watched list items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.update([1, 3, 5])

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([2])
    expect(list.getNewItems()).toEqual([5])
  })
})
