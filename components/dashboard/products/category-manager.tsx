"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, Edit, Folder, FolderPlus, MoreHorizontal, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

// Define the category type with subcategories
interface Category {
  id: string
  name: string
  description: string
  slug: string
  productCount: number
  subcategories: Category[]
  isExpanded?: boolean
  parentId?: string | null
}

// Mock data for categories with subcategories
const initialCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Electronic devices and accessories",
    slug: "electronics",
    productCount: 45,
    subcategories: [
      {
        id: "1-1",
        name: "Computers",
        description: "Laptops, desktops, and accessories",
        slug: "computers",
        productCount: 20,
        parentId: "1",
        subcategories: [
          {
            id: "1-1-1",
            name: "Laptops",
            description: "Portable computers",
            slug: "laptops",
            productCount: 12,
            parentId: "1-1",
            subcategories: [],
          },
          {
            id: "1-1-2",
            name: "Desktops",
            description: "Desktop computers",
            slug: "desktops",
            productCount: 8,
            parentId: "1-1",
            subcategories: [],
          },
        ],
      },
      {
        id: "1-2",
        name: "Audio",
        description: "Headphones, speakers, and audio equipment",
        slug: "audio",
        productCount: 15,
        parentId: "1",
        subcategories: [],
      },
      {
        id: "1-3",
        name: "Smartphones",
        description: "Mobile phones and accessories",
        slug: "smartphones",
        productCount: 10,
        parentId: "1",
        subcategories: [],
      },
    ],
  },
  {
    id: "2",
    name: "Clothing",
    description: "Apparel and fashion items",
    slug: "clothing",
    productCount: 32,
    subcategories: [
      {
        id: "2-1",
        name: "Men's",
        description: "Men's clothing",
        slug: "mens",
        productCount: 15,
        parentId: "2",
        subcategories: [],
      },
      {
        id: "2-2",
        name: "Women's",
        description: "Women's clothing",
        slug: "womens",
        productCount: 17,
        parentId: "2",
        subcategories: [],
      },
    ],
  },
  {
    id: "3",
    name: "Home & Kitchen",
    description: "Home goods and kitchen appliances",
    slug: "home-kitchen",
    productCount: 28,
    subcategories: [],
  },
]

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    slug: "",
  })
  const [allCategories, setAllCategories] = useState<Category[]>([])

  // Flatten categories for selection in dropdowns
  useEffect(() => {
    const flattenCategories = (categories: Category[], level = 0): Category[] => {
      return categories.reduce((acc: Category[], category) => {
        // Add the current category with level information
        const categoryWithLevel = { ...category, level }
        acc.push(categoryWithLevel)

        // Add subcategories if they exist
        if (category.subcategories.length > 0) {
          acc = [...acc, ...flattenCategories(category.subcategories, level + 1)]
        }

        return acc
      }, [])
    }

    setAllCategories(flattenCategories(categories))
  }, [categories])

  // Function to toggle category expansion
  const toggleCategory = (categoryId: string, categories: Category[]): Category[] => {
    return categories.map((category) => {
      if (category.id === categoryId) {
        return { ...category, isExpanded: !category.isExpanded }
      }
      if (category.subcategories.length > 0) {
        return {
          ...category,
          subcategories: toggleCategory(categoryId, category.subcategories),
        }
      }
      return category
    })
  }

  // Function to find a category by ID (recursive)
  const findCategoryById = (id: string, categoriesList: Category[]): Category | null => {
    for (const category of categoriesList) {
      if (category.id === id) {
        return category
      }
      if (category.subcategories.length > 0) {
        const found = findCategoryById(id, category.subcategories)
        if (found) return found
      }
    }
    return null
  }

  // Function to add a new category
  const addCategory = () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      })
      return
    }

    const newCategoryObj: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
      slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, "-"),
      productCount: 0,
      subcategories: [],
      parentId: parentCategoryId,
    }

    if (parentCategoryId) {
      // Add as subcategory
      const addSubcategory = (categories: Category[]): Category[] => {
        return categories.map((category) => {
          if (category.id === parentCategoryId) {
            return {
              ...category,
              subcategories: [...category.subcategories, newCategoryObj],
              isExpanded: true,
            }
          }
          if (category.subcategories.length > 0) {
            return {
              ...category,
              subcategories: addSubcategory(category.subcategories),
            }
          }
          return category
        })
      }

      setCategories(addSubcategory(categories))
      toast({
        title: "Success",
        description: `Subcategory "${newCategory.name}" added successfully`,
      })
    } else {
      // Add as top-level category
      setCategories([...categories, newCategoryObj])
      toast({
        title: "Success",
        description: `Category "${newCategory.name}" added successfully`,
      })
    }

    // Reset form
    setNewCategory({ name: "", description: "", slug: "" })
    setParentCategoryId(null)
    setIsAddDialogOpen(false)
  }

  // Function to update a category
  const updateCategory = () => {
    if (!selectedCategory) return

    if (!newCategory.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      })
      return
    }

    const updateCategoryInList = (categories: Category[]): Category[] => {
      return categories.map((category) => {
        if (category.id === selectedCategory.id) {
          return {
            ...category,
            name: newCategory.name,
            description: newCategory.description,
            slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, "-"),
          }
        }
        if (category.subcategories.length > 0) {
          return {
            ...category,
            subcategories: updateCategoryInList(category.subcategories),
          }
        }
        return category
      })
    }

    setCategories(updateCategoryInList(categories))
    toast({
      title: "Success",
      description: `Category "${newCategory.name}" updated successfully`,
    })
    setIsEditDialogOpen(false)
    setSelectedCategory(null)
    setNewCategory({ name: "", description: "", slug: "" })
  }

  // Function to delete a category
  const deleteCategory = (categoryId: string) => {
    const category = findCategoryById(categoryId, categories)
    if (!category) return

    const deleteCategoryFromList = (categories: Category[]): Category[] => {
      return categories.filter((category) => {
        if (category.id === categoryId) {
          return false
        }
        if (category.subcategories.length > 0) {
          category.subcategories = deleteCategoryFromList(category.subcategories)
        }
        return true
      })
    }

    setCategories(deleteCategoryFromList(categories))
    toast({
      title: "Success",
      description: `Category "${category.name}" deleted successfully`,
    })
  }

  // Function to open edit dialog
  const openEditDialog = (category: Category) => {
    setSelectedCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description,
      slug: category.slug,
    })
    setIsEditDialogOpen(true)
  }

  // Function to open add subcategory dialog
  const openAddSubcategoryDialog = (parentId: string) => {
    setParentCategoryId(parentId)
    setNewCategory({ name: "", description: "", slug: "" })
    setIsAddDialogOpen(true)
  }

  // Function to open add category dialog
  const openAddCategoryDialog = () => {
    setParentCategoryId(null)
    setNewCategory({ name: "", description: "", slug: "" })
    setIsAddDialogOpen(true)
  }

  // Filter categories based on search term (recursive)
  const filterCategories = (categories: Category[], term: string): Category[] => {
    if (!term) return categories

    return categories
      .filter((category) => {
        const matchesSearch =
          category.name.toLowerCase().includes(term.toLowerCase()) ||
          category.description.toLowerCase().includes(term.toLowerCase())

        const filteredSubcategories = filterCategories(category.subcategories, term)

        // Include this category if it matches or has matching subcategories
        return matchesSearch || filteredSubcategories.length > 0
      })
      .map((category) => ({
        ...category,
        subcategories: filterCategories(category.subcategories, term),
        isExpanded: term ? true : category.isExpanded,
      }))
  }

  const filteredCategories = filterCategories(categories, searchTerm)

  // Recursive component to render categories and subcategories
  const renderCategories = (categories: Category[], level = 0) => {
    return categories.map((category) => (
      <div key={category.id} className="category-item">
        <div
          className={`flex items-center justify-between p-3 hover:bg-muted/50 rounded-md ${level > 0 ? `ml-${Math.min(level * 6, 12)}` : ""}`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {category.subcategories.length > 0 ? (
              <button
                onClick={() => setCategories(toggleCategory(category.id, categories))}
                className="p-1 rounded-md hover:bg-muted flex-shrink-0"
              >
                {category.isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            ) : (
              <span className="w-6 flex-shrink-0"></span>
            )}
            <Folder className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <span className="font-medium truncate">{category.name}</span>
            <Badge variant="outline" className="ml-2 hidden sm:inline-flex">
              {category.productCount} products
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openEditDialog(category)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openAddSubcategoryDialog(category.id)}>
                  <FolderPlus className="mr-2 h-4 w-4" />
                  Add Subcategory
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={() => deleteCategory(category.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {category.isExpanded && category.subcategories.length > 0 && (
          <div className="subcategories">{renderCategories(category.subcategories, level + 1)}</div>
        )}
      </div>
    ))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Manage your product categories and subcategories</CardDescription>
          </div>
          <Button onClick={openAddCategoryDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="border rounded-md">
            {filteredCategories.length > 0 ? (
              <div className="category-tree">{renderCategories(filteredCategories)}</div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No categories found. {searchTerm && "Try a different search term or"} create a new category.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Category/Subcategory Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-w-[95vw]">
          <DialogHeader>
            <DialogTitle>
              {parentCategoryId
                ? `Add Subcategory to ${findCategoryById(parentCategoryId, categories)?.name}`
                : "Add New Category"}
            </DialogTitle>
            <DialogDescription>
              {parentCategoryId
                ? "Create a new subcategory to organize your products"
                : "Create a new product category to organize your products"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="e.g., Electronics"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="e.g., electronics"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">Used in URLs. Leave blank to generate from name.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe this category"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
            {!parentCategoryId && allCategories.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="parent">Parent Category (Optional)</Label>
                <Select
                  value={parentCategoryId || ""}
                  onValueChange={(value) => setParentCategoryId(value === "" ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    {allCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {Array(category.level || 0)
                          .fill("—")
                          .join("")}{" "}
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Optional: Select a parent category to create a subcategory
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addCategory} disabled={!newCategory.name}>
              Save Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-w-[95vw]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the details of this category</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Category Name</Label>
              <Input
                id="edit-name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-slug">Slug</Label>
              <Input
                id="edit-slug"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={updateCategory}>Update Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

