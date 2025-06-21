import { useState, useEffect } from 'react';
import { useAdminData } from '../../hooks/useAdminData';
import DataTable from '../../components/admin/DataTable';
import MobileDataCard from '../../components/admin/MobileDataCard';
import StatusBadge from '../../components/admin/StatusBadge';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import ProductFormModal from '../../components/admin/ProductFormModal';
import ImageUploadModal from '../../components/admin/ImageUploadModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import useApi from '../../services/apiService';

const categoryOptions = [
  'Chocolates',
  'Macarons',
  'Fudge',
  'Bonbons',
  'Jellies',
  'Pralines'
];

export default function ProductsPage() {
  const { data: products, loading, error, fetchData } = useAdminData('products');
  const api = useApi();
  const [newProductId, setNewProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async () => {
    try {
      await api.deleteProduct(selectedProduct._id);
      fetchData();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const columns = [
    { 
      header: 'Product', 
      accessor: product => (
        <div className="flex items-center space-x-4">
          {product.images?.[0]?.url ? (
            <img 
              src={product.images[0].url} 
              alt={product.name} 
              className="w-12 h-12 object-cover rounded-md" 
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{product.name}</p>
            <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
          </div>
        </div>
      )
    },
    { 
      header: 'Category', 
      accessor: product => (
        <span className="capitalize">{product.category}</span>
      )
    },
    { 
      header: 'Price', 
      accessor: product => (
        <span className="font-medium">₹{product.price}</span>
      )
    },
    { 
      header: 'Stock', 
      accessor: product => (
        <StatusBadge 
          status={product.stock > 0 ? 'In Stock' : 'Out of Stock'} 
          variants={{
            'In Stock': 'green',
            'Out of Stock': 'red'
          }}
        />
      )
    },
    {
      header: 'Actions',
      accessor: product => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedProduct(product);
              setIsFormOpen(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setSelectedProduct(product);
              setIsImageUploadOpen(true);
            }}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-md"
            title="Manage Images"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setSelectedProduct(product);
              setIsDeleteModalOpen(true);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-4 border-gray-200 gap-4">
        <h2 className="text-3xl font-extrabold text-gray-800">Product Management</h2>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">All Categories</option>
            {categoryOptions.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-md px-3 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsFormOpen(true);
            }}
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
      
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : (
        <>
          <div className="hidden md:block">
            <DataTable data={filteredProducts} columns={columns} />
          </div>
          <div className="md:hidden space-y-4">
            {filteredProducts.map(product => (
              <MobileDataCard
                key={product._id}
                title={product.name}
                subtitle={`${product.category} • ₹${product.price}`}
                status={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                statusVariants={{
                  'In Stock': 'green',
                  'Out of Stock': 'red'
                }}
                action={
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsFormOpen(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsImageUploadOpen(true);
                      }}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-md"
                      title="Manage Images"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        </>
      )}

<ProductFormModal
  isOpen={isFormOpen}
  onClose={() => {
    setIsFormOpen(false);
    setNewProductId(null);
  }}
  product={selectedProduct}
  onSuccess={(createdProduct) => {
    fetchData();
    if (!selectedProduct && createdProduct) {
      // If it was a new product creation
      setNewProductId(createdProduct._id);
      setSelectedProduct(createdProduct);
      setIsImageUploadOpen(true);
    }
  }}
  categories={categoryOptions}
/>

      {selectedProduct && (
        <>
          <ImageUploadModal
  isOpen={isImageUploadOpen}
  onClose={() => setIsImageUploadOpen(false)}
  product={selectedProduct || { _id: newProductId }} // Handle case for newly created product
  onSuccess={() => {
    fetchData();
    setNewProductId(null);
  }}
/>

          <ConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            title="Delete Product"
            message={`Are you sure you want to delete "${selectedProduct.name}"? This action cannot be undone.`}
          />
        </>
      )}
    </div>
  );
}