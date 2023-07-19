import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import ReactPaginate from "react-paginate";

import Empty from "../components/default/Empty";
import Footer from "../components/default/Footer";
import Header from "../components/default/Header";
import ProductListCard from "../components/homepage/ProductListCard";
import { Female, Male } from "../constants";
import { fetchCarts } from "../reducks/cart/operations";
import { getCarts } from "../reducks/cart/selectors";
import { fetchCategories } from "../reducks/category/operations";
import { getCategories } from "../reducks/category/selectors";
import { fetchProducts } from "../reducks/product/operations";
import { getProducts } from "../reducks/product/selectors";

export default function Homepage() {
  const query = new URLSearchParams(useLocation().search);
  const queryType = query.get("type");
  const queryCategoryId = query.get("categoryId");
  const queryCategoryName = query.get("categoryName") || null;

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const categories = getCategories(selector);
  const carts = getCarts(selector);
  const [type, setType] = useState(queryType);
  const [category, setCategory] = useState({
    id: queryCategoryId,
    name: queryCategoryName,
  });
  const [activeCategory, setActiveCategory] = useState(+queryCategoryId);
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);

  const title = type ? (type === "male" ? Male : Female) : "Products List";

  const femaleProduct = React.useMemo(
    () => products.results.filter((p) => p.type === "female"),
    [products]
  );
  const maleProduct = React.useMemo(
    () => products.results.filter((p) => p.type === "male"),
    [products]
  );

  const onPageChange = (e) => {
    setPage(e.selected + 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(fetchProducts({ type, category_id: category.id, search, page }));
    dispatch(fetchCategories());
    dispatch(fetchCarts());
  }, [type, category, search, page, dispatch]);

  const categoryHandler = (category, isReset = false) => {
    setPage(1);
    if (isReset) {
      setCategory({ id: null, name: null });
      setActiveCategory(0);
      return;
    }
    setCategory({ id: category.id, name: category.name });
    setActiveCategory(category.id);
  };

  return (
    <>
      <Header totalCart={carts.totalCart} setSearch={setSearch} setPage={setPage} />
      <section className="main-wrapper">
        <div className="homepage">
          <div className="homepage-container">
            <div className="homepage-content">
              <div className="homepage-title">
                {title} {category.name && `- ${category.name}`}
              </div>
              {!products.results || products.results.length === 0 ? (
                <Empty message="Products are unavailable." />
              ) : (
                <>
                  {category.name && !type ? (
                    <>
                      {femaleProduct.length > 0 && (
                        <ProductListCard labelType={Female} products={femaleProduct} carts={carts.results} />
                      )}
                      {maleProduct.length > 0 && (
                        <ProductListCard labelType={Male} products={maleProduct} carts={carts.results} />
                      )}
                    </>
                  ) : (
                    <ProductListCard products={products.results} carts={carts.results} />
                  )}
                </>
              )}
            </div>
          </div>
          <div className="product-pagination">
            <ReactPaginate
              breakLabel="..."
              onPageChange={onPageChange}
              forcePage={page - 1}
              pageRangeDisplayed={3}
              pageCount={products.total_pages}
              renderOnZeroPageCount={null}
              containerClassName="pagination-container"
              pageClassName="page-item"
              breakClassName="page-item"
              pageLinkClassName="page-link"
              breakLinkClassName="page-link"
              previousClassName="d-none"
              nextClassName="d-none"
              activeClassName="page-active"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
