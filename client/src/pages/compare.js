import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getProductsToCompare, removeFromCompare } from "reduxStore/actions";

const redux = createSelector(
  (state) => state.userData.compareProductsView,
  (products) => products
);

const Compare = () => {
  const dispatch = useDispatch();
  const products = useSelector(redux);
  const [names, setNames] = useState([]);
  const [images, setImages] = useState([]);
  const [konzum, setKonzum] = useState([]);
  const [amko, setAmko] = useState([]);
  const [ebios, setEbios] = useState([]);
  const [ids, setIds] = useState([]);

  const remove = (id) => () => dispatch(removeFromCompare(id));

  useEffect(() => {
    dispatch(getProductsToCompare);
  }, [dispatch]);

  useEffect(() => {
    setNames(products.map((p) => p.name));
    setImages(
      products.map((p) => p.konzum.image ?? p.amko.image ?? p.ebios.image)
    );
    setKonzum(products.map((p) => p.konzum));
    setAmko(products.map((p) => p.amko));
    setEbios(products.map((p) => p.ebios));
    setIds(products.map((p) => p._id));
  }, [products]);
  return (
    <div className="py-16 mb-2 mx-auto w-full max-w-screen-xl">
      <div className="comparison-table w-full">
        {products.length > 0 ? (
          <table className="table-bordered w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="" />
                {images.map((img, i) => (
                  <th className="comparison-item" key={img}>
                    <img src={img} alt="Apple iPhone Xs Max" />
                    <button className="remove-item" onClick={remove(ids[i])}>
                      &times;
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody id="summary" data-filter="target">
              <tr className="bg-secondary">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Proizvod
                </th>
                {names.map((name) => (
                  <td key={name}>
                    <span className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {name}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="bg-secondary">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Prodavnica
                </th>
                {names.map((_, i) => (
                  <td
                    key={i}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Konzum
                  </td>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dostupnost
                </th>
                {konzum.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.available ? "DA" : "NE"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cijena
                </th>
                {konzum.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.price ? `${k.price} KM` : "/"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kolicina
                </th>
                {konzum.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.qty ?? "/"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Old Price
                </th>
                {konzum.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.oldPrice ? `${k.oldPrice} KM` : "/"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Until
                </th>
                {konzum.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.until ?? "/"}
                  </th>
                ))}
              </tr>
              <tr className="bg-secondary">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Prodavnica
                </th>
                {names.map((_, i) => (
                  <td
                    key={i}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Amko
                  </td>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dostupnost
                </th>
                {amko.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {amko.available ? "DA" : "NE"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cijena
                </th>
                {amko.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.price ? `${k.price} KM` : "/"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kolicina
                </th>
                {amko.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.qty ?? "/"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Old Price
                </th>
                {amko.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.oldPrice ? `${k.oldPrice} KM` : "/"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Until
                </th>
                {amko.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.until ?? "/"}
                  </th>
                ))}
              </tr>
              <tr className="bg-secondary">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Prodavnica
                </th>
                {names.map((_, i) => (
                  <td
                    key={i}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Ebios
                  </td>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dostupnost
                </th>
                {ebios.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.available ? "DA" : "NE"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cijena
                </th>
                {ebios.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.price ? `${k.price} KM` : "/"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kolicina
                </th>
                {ebios.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.qty ?? "/"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Old Price
                </th>
                {ebios.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.oldPrice ? `${k.oldPrice} KM` : "/"}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Until
                </th>
                {ebios.map((k, i) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    key={i}
                  >
                    {k.until ?? "/"}
                  </th>
                ))}
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No products to compare</p>
        )}
      </div>
    </div>
  );
};

export default Compare;
