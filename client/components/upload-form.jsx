import React, { useState, useEffect, useContext, useRef } from 'react';
import ColorThiefClass from '../lib/colorThiefClass';
import categorizeColor from '../lib/categorizeColor';
import colorConvert from 'color-convert';
import Resizer from 'react-image-file-resizer';
import ColorSelect from './color-select';
import AppContext from '../lib/app-context';
import { Spinner } from 'reactstrap';

const colorThief = new ColorThiefClass();

export default function UploadForm(props) {
  const [img, setImg] = useState('images/hoodiePlaceholder.png');
  const [imgFile, setImgFile] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [colorCategory, setColorCategory] = useState('Color');
  const [colorCategoryId, setColorCategoryId] = useState(null);
  const [secondaryColorCategory, setSecondaryColorCategory] = useState('Color');
  const [secondaryColorCategoryId, setSecondaryColorCategoryId] = useState(null);
  const [articleType, setArticleType] = useState('');
  const [articleTypeId, setArticleTypeId] = useState(null);
  const [colorCategorySelect, setColorCategorySelect] = useState('Primary');
  const [networkError, setNetworkError] = useState(false);
  const fileInputRef = useRef(null);

}
